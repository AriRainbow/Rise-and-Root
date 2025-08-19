document.addEventListener('DOMContentLoaded', () => {
    const plantInfoDiv = document.getElementById('plant-info');
    const button = document.getElementById('load-plant-btn');
  
    async function fetchPlant() {
      plantInfoDiv.innerHTML = '<p>Loading plant data...</p>';
  
      try {
        const response = await fetch('https://trefle.io/api/v1/distributions/oklahoma/plants?token=VGK3BVm7MRpoLyWMOwU4ndf85R8Sw-X4qXvZh9B4wRs&page_size=1&page=' + Math.floor(Math.random() * 20));
        const data = await response.json();
        const plant = data.data[0];
  
        if (!plant) {
          plantInfoDiv.innerHTML = '<p>Sorry, no plant data found.</p>';
          return;
        }
  
        const name = plant.common_name || plant.scientific_name;
        const image = plant.image_url || 'images/plant-placeholder.png'; // fallback
  
        plantInfoDiv.innerHTML = `
          <h3>${name}</h3>
          <img src="${image}" alt="${name}" class="img-fluid rounded my-3" style="max-height: 300px;">
          <p><em>${plant.scientific_name}</em></p>
        `;
      } catch (error) {
        console.error('Error fetching plant:', error);
        plantInfoDiv.innerHTML = '<p>Failed to load plant data. Please try again.</p>';
      }
    }
  
    button.addEventListener('click', fetchPlant);
  
    // Initial fetch
    fetchPlant();
  });