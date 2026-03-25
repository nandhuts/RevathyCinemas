import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const BMS_URL = 'https://in.bookmyshow.com/cinemas/kollam/revathy-cinemax-rgb-real-laser-parippally/buytickets/RYCP/20260324';

// Fallback mock data in case BookMyShow blocks the request (e.g. HTTP 403 due to Cloudflare/Akamai)
const FALLBACK_MOVIES = [
  {
    id: 'f1',
    title: 'Dune: Part Two (Fallback)',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1925',
    rating: '9.2 / 10',
    genres: ['Action', 'Sci-Fi'],
    language: 'English',
    duration: '2h 46m',
    showtimes: [
      { time: '10:00 AM', status: 'Available' },
      { time: '01:30 PM', status: 'Available' }
    ]
  },
  {
    id: 'f2',
    title: 'Manjummel Boys (Fallback)',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=2070',
    rating: '9.5 / 10',
    genres: ['Thriller', 'Drama'],
    language: 'Malayalam',
    duration: '2h 15m',
    showtimes: [
      { time: '11:15 AM', status: 'Filling Fast' },
      { time: '07:30 PM', status: 'Available' }
    ]
  }
];

export async function GET() {
  try {
    const res = await fetch(BMS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`BookMyShow fetch failed: ${res.status} ${res.statusText}. Using fallback data.`);
      return NextResponse.json({ success: true, fromFallback: true, movies: FALLBACK_MOVIES });
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    
    const movies: any[] = [];
    
    // BookMyShow usually has a list container inside their BuyTickets page
    // Using a typical BMS DOM structure approach:
    $('.list .list').each((i, el) => {
        const titleEl = $(el).find('.__title span').first();
        if (!titleEl.length) return;
        
        const title = titleEl.text().trim();
        const infoText = $(el).find('.__tags').text().trim() || 'Action';
        const genres = infoText.split(',').map(g => g.trim()).filter(Boolean);
        
        const showtimes: any[] = [];
        $(el).find('.showtime-pill').each((_, stEl) => {
            const time = $(stEl).text().trim();
            if (time) {
                // Determine status based on class attributes (e.g. green/orange/red texts for available/fast/housefull)
                const isHousefull = $(stEl).text().toLowerCase().includes('sold') || $(stEl).attr('class')?.includes('_sold');
                showtimes.push({ 
                    time, 
                    status: isHousefull ? 'Housefull' : 'Available' 
                });
            }
        });

        // In case BMS has changed their DOM, fallback to scraping JSON state if present
        if (title && showtimes.length > 0) {
            movies.push({
                id: `bms-${i}`,
                title: title,
                image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2059', // BMS might not load HD images in html directly due to lazy loading
                rating: 'New / 10',
                genres: genres.length > 0 ? genres : ['Cinema'],
                language: 'Various',
                duration: '2h+',
                showtimes: showtimes,
            });
        }
    });

    // Strategy 2: Extract JSON from Next.js state or standard BMS script structures if DOM failed
    if (movies.length === 0) {
        $('script').each((_, script) => {
            const text = $(script).html();
            if (text && text.includes('__NEXT_DATA__')) {
               try {
                   // Highly site-specific regex extraction, might fail if obfuscated
                   const match = text.match(/window\.__NEXT_DATA__\s*=\s*({.*?});/);
                   if (match && match[1]) {
                       // BMS usually holds a deeply nested state here. Since it's dynamic, parsing it completely is complex.
                       // Left as a placeholder if DOM scraping yields zero movies.
                   }
               } catch (e) {}
            }
        });
    }

    if (movies.length === 0) {
       console.warn('BookMyShow generic HTML parsing found no movies or they have changed DOM. Using fallback data.');
       return NextResponse.json({ success: true, fromFallback: true, movies: FALLBACK_MOVIES });
    }

    return NextResponse.json({ success: true, fromFallback: false, movies });
  } catch (error) {
    console.error('Error scraping BookMyShow:', error);
    return NextResponse.json({ success: true, fromFallback: true, movies: FALLBACK_MOVIES }, { status: 200 }); // Still return 200 so UI doesn't crash 
  }
}
