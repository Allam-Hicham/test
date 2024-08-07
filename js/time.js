    // Function to format time in HH:MM:SS format
    function formatTime(hours, minutes, seconds) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
      function formatTimeS(hours, minutes) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }
  
      // Update the current time display
      function updateCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        document.getElementById('current-time').textContent = formatTime(hours, minutes, seconds);
      }
  
      // Update the time spent on the page display
      function updateTimeSpent() {
        const now = new Date();
        const timeSpent = Math.floor((now - startTime) / 1000);
        const hours = Math.floor(timeSpent / 3600);
        const minutes = Math.floor((timeSpent % 3600) / 60);
        document.getElementById('time-spent').textContent = formatTimeS(hours, minutes);
      }
  
      // Set the start time when the page loads
      const startTime = new Date();
  
      // Update the clocks every second
      setInterval(updateCurrentTime, 1000);
      setInterval(updateTimeSpent, 1000);
  
      // Initial update
        updateCurrentTime();
        updateTimeSpent();
      