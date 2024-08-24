if ('NDEFReader' in window) {
    const ndef = new NDEFReader();
    ndef.scan().then(() => {
        console.log("Scan started successfully.");
        ndef.onreading = event => {
            const decoder = new TextDecoder();
            for (const record of event.message.records) {
                if (record.recordType === "text") {
                    const text = decoder.decode(record.data);
                    if (text === "your-unique-nfc-tag-id") {
                        document.getElementById('content').style.display = 'block';
                    } else {
                        document.getElementById('access-denied').style.display = 'block';
                    }
                }
            }
        };
    }).catch(error => {
        console.log(`Error: ${error}`);
        document.getElementById('access-denied').style.display = 'block';
    });
} else {
    document.getElementById('access-denied').style.display = 'block';
}