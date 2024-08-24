const correctPassword = "admin";

if ('NDEFReader' in window) {
    const ndef = new NDEFReader();
    ndef.scan().then(() => {
        console.log("Scan started successfully.");
        ndef.onreading = event => {
            const decoder = new TextDecoder();
            for (const record of event.message.records) {
                if (record.recordType === "text") {
                    const text = decoder.decode(record.data);
                    if (text === "04:7E:B2:D5:5F:61:80") {
                        document.getElementById('content').style.display = 'block';
                    } else {
                        document.getElementById('access-denied').style.display = 'block';
                    }
                }
            }
        };
    }).catch(error => {
        console.log(`Error: ${error}`);
        document.getElementById('password-prompt').style.display = 'block';
    });
} else {
    document.getElementById('password-prompt').style.display = 'block';
}

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === correctPassword) {
        document.getElementById('content').style.display = 'block';
        document.getElementById('password-prompt').style.display = 'none';
    } else {
        document.getElementById('access-denied').style.display = 'block';
        document.getElementById('password-prompt').style.display = 'none';
    }
}