// TEST AREA // 

  // function sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  
  // async function get_info() {
  //   await sleep(500);
  //   const entries = Array.from(document.querySelectorAll(".styles__draftPoolContent__OvOLG"));
  //   var entry_names = [];
  //   if (entries.length > 0) {
  //     for (let index = 0; index < entries.length; index++) {
  //       var temp_list = [];
  //       const entry = entries[index];
  
  //       const username = entry.querySelector(".styles__draftPoolTitle__PBQL9")
  //       if (username) {
  //         const username_text = username.textContent.trim();
  //         temp_list.push(username_text);
  //       }
  //       const player = entry.querySelector(".styles__infoValue__dbbnp");
  //       if (player) {
  //         const player_text = player.textContent.trim();
  //         temp_list.push(player_text);
  //       }
  //       const pick = entry.querySelector(".styles__infoValue__dbbnp");
  //       if (pick) {
  //         const pick_text = pick.textContent.trim();
  //         temp_list.push(pick_text);
  //       }
  
  //       entry_names.push(temp_list);
  //     }
  //     chrome.storage.sync.get(['username'], async function(data) {
  //       const targetUsername = data.username;
  //       console.log(targetUsername);
  //       return targetUsername
  //     });
  //     // const targetUsername = 'THEWOOD1105';
  //     const filtered_array = entry_names.filter(innerArray => innerArray[0] === targetUsername);
  //     // return filtered_array;
  //     return entry_names;
  // }};
  
  // function removeOverlay() {
  //   const existingOverlay = document.getElementById('customOverlay');
  //   if (existingOverlay) {
  //     existingOverlay.remove();
  //   }
  // }
  
  // document.addEventListener("click", async function (event) {
  //   const specificDiv = event.target.closest(".styles__slateRow__aPpfu");
  //   if (specificDiv) {
  //     removeOverlay();
  //     const display_array = await get_info();
  //     console.log(display_array);
  
  //     const overlayContainer = document.createElement('div');
  //     overlayContainer.style.position = 'fixed';
  //     overlayContainer.style.top = '50%';
  //     overlayContainer.style.right = '20px';
  //     overlayContainer.style.transform = 'translateY(-50%)';
  //     overlayContainer.style.background = 'black';
  //     overlayContainer.style.padding = '10px';
  //     overlayContainer.style.border = '3px solid white';
  //     overlayContainer.style.color = 'white';
  //     overlayContainer.style.height = '300px';
  //     overlayContainer.style.width = '300px';
  //     overlayContainer.style.fontFamily = 'Arial, sans-serif';
  //     overlayContainer.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
  //     overlayContainer.style.transition = 'opacity 0.3s ease-in-out';
  //     overlayContainer.style.zIndex = '9999';
  //     overlayContainer.style.overflow = 'auto';
  
  //     // Check if display_array is an array before using map
  //     if (Array.isArray(display_array)) {
  //       // Construct a string from the array elements
  //       const overlayText = display_array.map(entry => entry.join(': ')).join('\n');
  //       overlayContainer.innerText = overlayText;
  //     } else {
  //       overlayContainer.innerText = 'Error: Display array is not valid.';
  //     }
  
  //     document.body.appendChild(overlayContainer);
  //   }
  // });
  



// LIVE AREA // 


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function get_username() {
  // Retrieve the username from Chrome storage
  return new Promise(resolve => {
    chrome.storage.sync.get(['username'], function (data) {
      const targetUsername = data.username;
      resolve(targetUsername);
    });
  });
}


async function get_info(username) {
  await sleep(500);
  const entries = Array.from(document.querySelectorAll(".styles__draftingCell__pD1pn.styles__draftingCell__Q8fFL"));
  var entry_names = [];
  if (entries.length > 0) {
    for (let index = 0; index < entries.length; index++) {
      var temp_list = [];
      const entry = entries[index];

      const username = entry.querySelector(".styles__username__McRvJ")
      if (username) {
        const username_text = username.textContent.trim();
        temp_list.push(username_text);
      }
      const player = entry.querySelector(".styles__pickName__b7C37");
      if (player) {
        const player_text = player.textContent.trim();
        temp_list.push(player_text);
      }
      const info = entry.querySelector(".styles__pickPos__cY94W");
      if (info) {
        const info_text = info.textContent.trim();
        const position = info_text.split(" - ")[0];
        const team = info_text.split(" - ")[1];
        temp_list.push(position);
        temp_list.push(team);
      }
      const pick = entry.querySelector(".styles__roundAndPick__NHB1t");
      if (pick) {
        const pick_text = pick.textContent.trim();
        temp_list.push(pick_text);
      }

      entry_names.push(temp_list);
    }

    // chrome.storage.sync.get(['username'], async function(data) {
    //   const targetUsername = data.username;
    //   console.log(targetUsername);
    //   return targetUsername
    // });
    // const targetUsername = username;
    //console.log(username);
    const filtered_array = entry_names.filter(innerArray => innerArray[0] === username);
    return filtered_array;
}};

function removeOverlay() {
  const existingOverlay = document.getElementById('customOverlay');
  if (existingOverlay) {
    existingOverlay.remove();
  }
}

document.addEventListener("click", async function (event) {
  const specificDiv = event.target.closest(".styles__activeDraftCell__ZFLtW");
  if (specificDiv) {
    removeOverlay();
    
    // Retrieve the username
    let username = await get_username();
    //let username = "THEWOOD1105";
    console.log(username);
    // console.log("benis");
    
    const display_array = await get_info(username);
    console.log(display_array);

    const overlayContainer = document.createElement('div');
    overlayContainer.style.position = 'fixed';
    overlayContainer.style.top = '75%';
    overlayContainer.style.right = '20px';
    overlayContainer.style.transform = 'translateY(-50%)';
    overlayContainer.style.background = 'black';
    overlayContainer.style.padding = '10px';
    overlayContainer.style.border = '3px solid white';
    // overlayContainer.style.color = 'white';
    overlayContainer.style.height = '500px';
    overlayContainer.style.width = '500px';
    overlayContainer.style.fontFamily = 'Arial, sans-serif';
    overlayContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    overlayContainer.style.transition = 'opacity 0.3s ease-in-out';
    overlayContainer.style.zIndex = '9999';
    overlayContainer.style.overflow = 'auto';
    overlayContainer.style.fontFamily = 'Arial, sans-serif';
    overlayContainer.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    overlayContainer.style.transition = 'opacity 0.3s ease-in-out';
    overlayContainer.style.zIndex = '9999';
    overlayContainer.style.overflow = 'auto';

    // Check if display_array is an array before using map
    if (Array.isArray(display_array)) {
      // make a header row for the table
      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.flexDirection = 'row';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.marginBottom = '10px';
      header.style.borderBottom = '1px solid white';
      header.style.paddingBottom = '10px';
      // loop through the entry and create a table cell for each item
      const headerText = ['Player', 'Position', 'Team', 'Pick'];
      for (let i = 0; i < headerText.length; i++) {
        const cell = document.createElement('div');
        cell.style.display = 'flex';
        cell.style.flexDirection = 'column';
        cell.style.justifyContent = 'center';
        cell.style.alignItems = 'center';
        cell.style.width = '100px';
        cell.style.textAlign = 'center';
        const cellText = document.createElement('p');
        cellText.style.margin = '0';
        cellText.style.padding = '0';
        cellText.style.fontSize = '14px';
        cellText.style.fontWeight = 'bold';
        cellText.style.color = 'white';
        cellText.textContent = headerText[i];
        cell.appendChild(cellText);
        header.appendChild(cell);
      }
      overlayContainer.appendChild(header);

      // loop through the array and create a table row for each entry
      for (let index = 0; index < display_array.length; index++) {
        const entry = display_array[index];
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.marginBottom = '10px';
        row.style.borderBottom = '1px solid white';
        row.style.paddingBottom = '10px';
        // loop through the entry and create a table cell for each item
        for (let i = 1; i < entry.length; i++) {
          const cell = document.createElement('div');
          cell.style.display = 'flex';
          cell.style.flexDirection = 'column';
          cell.style.justifyContent = 'center';
          cell.style.alignItems = 'center';
          cell.style.width = '100px';
          cell.style.textAlign = 'center';
          const cellText = document.createElement('p');
          cellText.style.margin = '0';
          cellText.style.padding = '0';
          cellText.style.fontSize = '14px';
          cellText.style.fontWeight = 'bold';
          cellText.textContent = entry[i];
          if (cellText.textContent === 'SFLEX') {
            cellText.style.color = 'pink';
          } else if (cellText.textContent === 'QB') {
            cellText.style.color = 'purple';
          } else if (cellText.textContent === 'RB') {
            cellText.style.color = 'green';
          } else if (cellText.textContent === 'WR') {
            cellText.style.color = 'orange';
          } else if (cellText.textContent === 'TE') {
            cellText.style.color = 'blue';
          } else if (cellText.textContent === 'W/T') {
            cellText.style.color = 'orange';
          } else {
            cellText.style.color = 'white';
          }
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        overlayContainer.appendChild(row);
      }
      // Construct a string from the array elements
      // const overlayText = display_array.map(entry => entry.join(': ')).join('\n');
      // overlayContainer.innerText = overlayText;
      // overlayContainer.innerHTML = "<h1> TESTING </h1>";
    } else {
      overlayContainer.innerText = 'Error: Display array is not valid.';
    }

    document.body.appendChild(overlayContainer);
  }
});
