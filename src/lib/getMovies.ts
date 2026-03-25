import * as cheerio from 'cheerio';

const BMS_URL = 'https://in.bookmyshow.com/cinemas/kollam/revathy-cinemax-rgb-real-laser-parippally/buytickets/RYCP/20260324';

const FALLBACK_MOVIES = [
  {
    id: 1,
    title: 'Aadu 3 (U)',
    image: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/aadu-3-et00489871-1772466341.jpg',
    rating: 'New Release',
    genres: ['Action', 'Comedy'],
    language: 'Malayalam (4K 64-CH ATMOS)',
    duration: '2h 15m',
    trailer: 'https://www.youtube.com/watch?v=DQfmKXQqVD0',
    showtimes: [
      { time: '09:30 PM', status: 'Filling Fast' }
    ],
    nowShowing: true
  }
];

export async function getMovies() {
  try {
    const res = await fetch(BMS_URL, {
      method: "GET",
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!res.ok) {
      console.warn(`BookMyShow scraper: Received HTTP ${res.status}. Falling back to default data.`);
      return FALLBACK_MOVIES;
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const movies: any[] = [];
    
    // Parse BookMyShow structure (BuyTickets page)
    const listElements = $('.list');
    
    if (listElements.length > 0) {
      listElements.each((i, el) => {
        const titleEl = $(el).find('a.__movie-name');
        const title = titleEl.text().trim();
        if (!title) return;

        const languageEl = $(el).find('.__language');
        const language = languageEl.text().trim() || 'Malayalam';
        
        const showtimes: any[] = [];
        $(el).find('a.showtime-pill').each((_, stEl) => {
          const time = $(stEl).text().trim().replace(/M/g, 'M').replace(/\n/, '').trim();
          const className = $(stEl).attr('class') || '';
          let status = 'Available';
          if (className.includes('_sold') || time.toLowerCase().includes('sold')) {
            status = 'Housefull';
          } else if (className.includes('_fast')) {
            status = 'Filling Fast';
          }
          if (time && time.length > 3) showtimes.push({ time, status });
        });

        if (showtimes.length > 0) {
          movies.push({
            id: `bms-${i}`,
            title,
            image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800', // Need placeholder as BMS images are dynamic/lazy
            rating: 'New / 10',
            genres: ['Cinema'],
            language,
            duration: 'Local Show',
            trailer: '',
            showtimes,
            nowShowing: true
          });
        }
      });
    } else {
      // Look for Next.js data as alternative
      $('script').each((_, script) => {
        const content = $(script).html();
        if (content && content.includes('__NEXT_DATA__')) {
            console.log("BookMyShow returns a modern Next.js JSON-based page structure.");
        }
      });
    }

    if (movies.length === 0) {
      console.warn('BookMyShow generic HTML parsing found no movies. Using fallback data.');
      return FALLBACK_MOVIES;
    }

    return movies;
  } catch (error) {
    console.error('Error fetching from BookMyShow:', error);
    return FALLBACK_MOVIES;
  }
}
