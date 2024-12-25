// JavaScript to handle the weather updates feature and open a new window with the weather information

document.getElementById('weather-btn').addEventListener('click', function() {
    // Open a new window to display weather info
    const weatherWindow = window.open('', 'Weather Info', 'width=600,height=400');
    
    // Set a loading message while fetching data
    weatherWindow.document.write('<h2>Loading weather data...</h2>');
    
    const apiKey = 'f35e00382dc50ab8dd71861ec9b3dd57'; // Replace with your OpenWeatherMap API key
    const city = 'New York'; // You can dynamically change this based on user input

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch the weather data from OpenWeatherMap
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          // Extract weather data from the response
          const weatherDescription = data.weather[0].description;
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          
          // Create the HTML content to display in the new window
          const weatherInfo = `
            <h3>Weather in ${city}</h3>
            <p><strong>Description:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
          `;
          
          // Insert the weather info into the new window
          weatherWindow.document.write(weatherInfo);
        } else {
          weatherWindow.document.write('<p>Failed to retrieve weather data. Please try again.</p>');
        }
      })
      .catch(error => {
        weatherWindow.document.write('<p>Error fetching weather data.</p>');
      });
});

async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const tasks = await response.json();
  
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = ''; // Clear the list
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerText = task.task;
        taskItem.dataset.id = task.id;
  
        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
  
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
  async function addTask(taskDescription) {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskDescription })
      });
  
      if (response.ok) {
        await fetchTasks(); // Refresh the task list
      } else {
        console.error('Error adding task:', await response.json());
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
  async function deleteTask(taskId) {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks?id=${taskId}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await fetchTasks(); // Refresh the task list
      } else {
        console.error('Error deleting task:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
  document.getElementById('add-task-button').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
      addTask(taskDescription); // Add the task
      taskInput.value = ''; // Clear the input
    } else {
      alert('Please enter a task description!');
    }
  });
  
  // Fetch tasks when the page loads
  window.addEventListener('load', fetchTasks);
        
  document.getElementById('calender-btn').addEventListener('click', () => {
    window.location.href = 'timer.html'; 
  });