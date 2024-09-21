// Initialize web3 with MetaMask's provider

function populateLeaderboardTable(data) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Clear existing rows

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("odd:bg-white", "even:bg-gray-100");

    const addressCell = document.createElement("td");
    addressCell.classList.add(
      "px-6",
      "py-4",
      "whitespace-nowrap",
      "text-sm",
      "font-medium",
      "text-gray-800"
    );
    addressCell.textContent = item.address;

    const countCell = document.createElement("td");
    countCell.classList.add(
      "px-6",
      "py-4",
      "whitespace-nowrap",
      "text-sm",
      "text-gray-800"
    );
    countCell.textContent = item.count;

    const coinsCell = document.createElement("td");
    coinsCell.classList.add(
      "px-6",
      "py-4",
      "whitespace-nowrap",
      "text-sm",
      "text-gray-800"
    );
    coinsCell.textContent = item.coins;

    row.appendChild(addressCell);
    row.appendChild(countCell);
    row.appendChild(coinsCell);

    tbody.appendChild(row);
  });
}
const leaderBoardData = [
  {
    address: "#999999",
    count: 12,
    coins: 15,
  },
  {
    address: "#1222222",
    count: 6,
    coins: 18,
  },
];
if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");

  // Initialize Web3 with the provider
  const web3 = new Web3(window.ethereum);

  async function deposit() {
    let amount = Web3.utils.toHex(BigInt(Web3.utils.toWei("1", "ether")));
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x539" }],
    });
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const sender = accounts[0];
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          chainId: "0x539",
          from: sender,
          to: "0xb794f5ea0ba39494ce839613fffba74279579268",
          value: amount,
        },
      ],
    });

    // Now call /deposit
  }

  var x = document.getElementById("myAudio");
  var shit = document.getElementById("shit");

  function playAudio() {
    x.play();
    shit.style.backgroundImage =
      "url('./img/this-whirl-takes-in-everything.gif')";
    setTimeout(() => {
      x.pause();
      shit.style.backgroundImage = "none";
    }, 15000);
  }

  async function walletContent() {
    // Request accounts
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    // Get the current balance of the wallet
    const balance = await web3.eth.getBalance(accounts[0]);

    // Convert the balance to a readable format
    const formattedBalance = Web3.utils.fromWei(balance, "ether");

    // Create the content string
    let content = `
      <div class="wallet-content">
        <h2>Wallet Balance</h2>
        <p>Current balance: ${formattedBalance} ETH</p>
        
        <!-- Add buttons for deposit and withdraw -->
        <button onclick="deposit()">Deposit</button>
        <button onclick="withdraw()">Withdraw</button>
        
        <!-- Add a button to flush the toilet -->
        <button onclick="flushToilet()">Flush Toilet</button>
      </div>
    `;

    // Update the content of the wallet container
    document.getElementById("wallet-container").innerHTML = content;
  }

  document.addEventListener("DOMContentLoaded", () => {
    populateLeaderboardTable(leaderBoardData);

    const connectorElement = document.getElementById("connector");
    const flashBtn = document.getElementById("flash");
    let accounts;

    window.ethereum.on("accountsChanged", (newAccounts) => {
      accounts = newAccounts;
      updateConnectorState();
    });

    function updateConnectorState() {
      if (accounts && accounts.length > 0) {
        connectorElement.className =
          "bg-red-500 p-4 text-white rounded-lg shadow-md";
        connectorElement.textContent = "Disconnect Wallet";
        connectorElement.onclick = disconnectWallet;
        flashBtn.removeAttribute("disabled");
      } else {
        connectorElement.className = "bg-green-300 p-4 rounded-lg shadow-md";
        connectorElement.textContent = "Connect Wallet";
        flashBtn.setAttribute("disabled", "disabled");
        connectorElement.onclick = walletContent;
      }
    }

    // Initial check
    updateConnectorState();

    // Handle initial connection
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((initialAccounts) => {
        accounts = initialAccounts;
        updateConnectorState();
      })
      .catch((error) => {
        console.error("Error checking initial accounts:", error);
      });
  });

  async function disconnectWallet() {
    try {
      await window.ethereum.request({ method: "eth_sign", params: [""] });
      updateConnectorState();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  }
} else {
  console.log("MetaMask is not installed!");
}

// list

// leader board
// top 5
// timer flush
// git hub visibility
// token icon
// better back ground
// landing
// chains
// airdrop
// rules
