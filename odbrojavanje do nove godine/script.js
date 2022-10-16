
days = document.getElementById('days')
hours = document.getElementById('hours')
seconds = document.getElementById('seconds')
minutes = document.getElementById('minutes')
countdown = document.getElementById('countdown')
loading = document.getElementById('loading')
year = document.getElementById('year')

setTimeout(() => {
    loading.remove()
    countdown.style.display= 'flex'
}, 1000);

currentYear = new Date().getFullYear()
year.innerText = currentYear+1
newYearTime = new Date(`1.1.${currentYear+1} 00:00:00`)

function updateCountdown(){
    currentTime = new Date()
    diff = newYearTime - currentTime
    d=Math.floor(diff/1000/60/60/24)
    h=Math.floor(diff/1000/60/60)%24
    m=Math.floor(diff/1000/60)%60
    s=Math.floor(diff/1000)%60

    days.innerText = d<10 ? '0'+d:d

    hours.innerText = h<10 ? '0'+h:h

    minutes.innerText = m<10 ? '0'+m:m

    seconds.innerText = s<10 ? '0'+s:s
}
setInterval(updateCountdown,1000)