let input = document.getElementById("input");
let btn = document.getElementById("btn");
let box = document.getElementById("box");

btn.addEventListener("click", () => {
  const name = input.value.trim();
  if (!name) {
    alert("Please enter a name!");
    return;
  }

  const API = `https://api.nationalize.io/?name=${encodeURIComponent(name)}`;

  box.innerHTML = '<p class="loading">🔍 Searching for origin...</p>';
  box.style.opacity = "0.7";

  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      box.innerHTML = "";
      if (data.country && data.country.length > 0) {
        data.country.forEach((item) => {
          const countryCard = document.createElement("div");
          countryCard.className = "country-card";
          countryCard.innerHTML = `
            <div class="country-id">${item.country_id}</div>
            <div class="probability">${Math.floor(item.probability * 100)}%</div>
          `;
          box.appendChild(countryCard);
        });
      } else {
        box.innerHTML = "<p style='color: red;'>No data found for this name.</p>";
      }
    })
    .catch((err) => {
      box.innerHTML = "<p style='color: red;'>Error fetching data. Please try again.</p>";
      console.error(err);
    })
    .finally(() => {
      box.style.opacity = "1";
    });
});

// Enter key support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});