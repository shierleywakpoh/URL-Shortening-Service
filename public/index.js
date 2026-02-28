document.getElementById("myForm").addEventListener("submit", create);
async function create(e) {
  e.preventDefault();
  console.log("abc");
  const url = document.getElementById("url").value;
  try {
    const response = await fetch("http://localhost:5001/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    console.log("response", response);
    console.log("data", data);
    if (data.shortUrl) {
      return (document.getElementById(
        "output"
      ).innerHTML = `<p>Short url : ${data.shortUrl}</p>`);
    }
    if (data.message === "Url is reqired") {
      return (document.getElementById(
        "output"
      ).innerHTML = `<p>${data.message}</p>`);
    }
    if (data.message === "Short url exist") {
      return (document.getElementById(
        "output"
      ).innerHTML = `<p>${data.message}</p>`);
    }
  } catch (error) {
    return (document.getElementById(
      "output"
    ).innerHTML = `<p>Something went wrong</p>`);
  }
}

document.getElementById("retrieve").addEventListener("submit", retrieve);
async function retrieve(e) {
  e.preventDefault();

  const url = document.getElementById("url1").value;
  if (url == "") {
    return (document.getElementById("output4").innerHTML = `<p>
    Url is reqired
    </p>`);
  }
  try {
    const response = await fetch(`http://localhost:5001/shorten/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.url) {
      return (window.location.href = data.url);
    }
    if (data.message === "Short url not found") {
      return (document.getElementById("output4").innerHTML = `<p>
    ${data.message}
    </p>`);
    }
  } catch (error) {
    return (document.getElementById(
      "output4"
    ).innerHTML = `<p>Something went wrong</p>`);
  }
}

document.getElementById("update").addEventListener("submit", update);
async function update(e) {
  e.preventDefault();

  const urlShort = document.getElementById("url2").value;
  const url = document.getElementById("url3").value;
  if (urlShort == "") {
    return (document.getElementById("output1").innerHTML = `<p>
     Url short is required 
    </p>`);
  }

  try {
    const response = await fetch(`http://localhost:5001/shorten/${urlShort}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    console.log(data);
    if (data.url) {
      return (document.getElementById("output1").innerHTML = `<p>
    
    id: ${data.id},<br>
    url: ${data.url}, <br>
    shortUrl: ${data.shortUrl}, <br>
    createAt: ${data.createAt}, <br>
    updateAt: ${data.updateAt} <br>
    </p>`);
    }
    if (data.message === "Short url not found") {
      return (document.getElementById("output1").innerHTML = `<p>
    ${data.message}
    </p>`);
    }
    if (data.message === "Url is required") {
      return (document.getElementById("output1").innerHTML = `<p>
    ${data.message}
    </p>`);
    }
  } catch (error) {
    return (document.getElementById(
      "output1"
    ).innerHTML = `<p>Something went wrong</p>`);
  }
}
document.getElementById("delete").addEventListener("submit", deleted);
async function deleted(e) {
  e.preventDefault();

  const urlShort = document.getElementById("url4").value;
  if (urlShort == "") {
    return (document.getElementById("output2").innerHTML = `<p>
    Short url is required 
    </p>`);
  }
  try {
    const response = await fetch(`http://localhost:5001/shorten/${urlShort}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("abc", response);

    if (response.status === 204) {
      return (document.getElementById("output2").innerHTML = `<p>
      Successfully deleted 
      </p>`);
    }
    const data = await response.json();

    if (data.message === "short url not found") {
      return (document.getElementById("output2").innerHTML = `<p>
    Short url not found
    </p>`);
    }
  } catch (error) {
    return (document.getElementById("output2").innerHTML = `<p>
    Something went wrong
    </p>`);
  }
}

document.getElementById("statistic").addEventListener("submit", statistic);
async function statistic(e) {
  e.preventDefault();

  const urlShort = document.getElementById("url5").value;
  if (urlShort == "") {
    return (document.getElementById("output3").innerHTML = `<p>
      Short is required </p>
    `);
  }

  try {
    const response = await fetch(
      `http://localhost:5001/shorten/${urlShort}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.url) {
      return (document.getElementById("output3").innerHTML = `<p>
    
    accessCount: ${data.accessCount}
    </p>`);
    }
    if (data.message === "short not found") {
      return (document.getElementById("output3").innerHTML = `<p>
      Short not found </p>
    `);
    }
    if (urlShort == "") {
      return (document.getElementById("output3").innerHTML = `<p>
      Short is required </p>
    `);
    }
  } catch (error) {
    return (document.getElementById("output3").innerHTML = `<p>
    Something went wrong
    </p>`);
  }
}
