let chartRendered = false;

function standardDownload() {
    document.getElementById("standardDownload").click();
}
function proDownload() {
    document.getElementById("proDownload").click();
}
function corporationDownload() {
    document.getElementById("corporationDownload").click();
}

const chartSettings = {
    type: 'bar',
    data: {
        labels: ['Windows 11', 'Windows 10', 'MacOS', 'Ubuntu', 'Chrome OS', 'emexOS14'],
        datasets: [{
            data: [
                27 * 1024,       // Windows 11: MB
                15.64 * 1024,
                12.23 * 1024,
                4.5 * 1024,
                4 * 1024,
                0.0023 * 1024    // emexOS14: 1.5 MB
            ],
            backgroundColor: ["#db6eac", "#d160a8", "#d160c6", "#bc60d1", "#a868d4", "#5fd255"],
            borderColor: '#36447d',
            borderWidth: 0,
            borderRadius: 6,
            barThickness: 110
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Size On Disk (MB)',
                    color: '#000',
                    font: { size: 16, weight: 600 }
                },
                ticks: {
                    color: '#000',
                    font: { size: 12 }
                },
                grid: { color: 'rgba(0, 0, 0, 0.1)' }
            },
            x: {
                ticks: {
                    color: '#000',
                    font: { size: 14 }
                },
                grid: { display: false }
            }
        },
        animation: {
            duration: 1000,
            easing: "easeOutQuart"
        },
        responsive: true,
        maintainAspectRatio: false,
    }
};

window.onload = function () {
    const canvas = document.getElementById("myChart");
    const parent = document.getElementById("parent");
    canvas.width = parent.offsetWidth - 40;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chartRendered) {
                const ctx = canvas.getContext("2d");
                new Chart(ctx, chartSettings);
                chartRendered = true;
                obs.unobserve(canvas);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(canvas);
};
