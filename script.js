const baseApiUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"

const bgOverlay = document.getElementById('bg-overlay');
const titleEl = document.getElementById('title');
const dateEl = document.getElementById('date');
const descEl = document.getElementById('description');
const randomBtn = document.getElementById('random-btn');

async function fetchSpaceWallpaper(date = '') {
    let url = baseApiUrl;
    if (date) {
        url += `&date=${date}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.media_type !== 'image') {
            fetchRandomSpace();
            return;
        }

        bgOverlay.style.backgroundImage = `url('${data.hdurl || data.url}')`;
        titleEl.innerText = data.title;
        dateEl.innerText = data.date;
        descEl.innerText = data.explanation;

    } catch (error) {
        titleEl.innerText = "Xəta baş verdi!";
        descEl.innerText = "Kosmik məlumatları yükləmək mümkün olmadı. İnternet bağlantısını yoxlayın.";
    }
}

function fetchRandomSpace() {
    titleEl.innerText = "Kosmosda səyahət edilir...";
    
    const start = new Date(2015, 0, 1);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    const formattedDate = randomDate.toISOString().split('T');
    fetchSpaceWallpaper(formattedDate);
}

randomBtn.addEventListener('click', fetchRandomSpace);
fetchSpaceWallpaper();
