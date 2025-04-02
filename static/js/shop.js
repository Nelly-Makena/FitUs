 const messages = [
            "⚡ Push Your Limits!️",
            "Stay Strong, Stay Fit! ⚡",
            " Train Hard, Feel Great!"
        ];
        let index = 0;

        function changeText() {
            index = (index + 1) % messages.length;
            document.getElementById("dynamic-text").textContent = messages[index];
        }

        setInterval(changeText, 5000);