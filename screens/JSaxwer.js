// index.js (partial update)
app.post('/api/stkpush', async (req, res) => {
    const { phone, amount, method } = req.body;

    if (method !== 'mpesa' && method !== 'airtel') {
        return res.status(400).json({ error: 'Invalid payment method' });
    }

    if (method === 'mpesa') {
        try {
            const token = await getAccessToken();
            const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
            const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
            const amountInKES = Math.round(amount * 130); // USD to KES

            const stkPushData = {
                BusinessShortCode: SHORTCODE,
                Password: password,
                Timestamp: timestamp,
                TransactionType: 'CustomerPayBillOnline',
                Amount: amountInKES,
                PartyA: phone,
                PartyB: SHORTCODE,
                PhoneNumber: phone,
                CallBackURL: 'https://your-ngrok-url/callback',
                AccountReference: 'NetflixSub',
                TransactionDesc: 'Netflix Subscription Payment',
            };

            const response = await axios.post(
                `${BASE_URL}/mpesa/stkpush/v1/processrequest`,
                stkPushData,
                {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                }
            );

            res.json(response.data);
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            res.status(500).json({ error: 'M-Pesa STK Push failed' });
        }
    } else {
        res.status(501).json({ error: 'Airtel Money not yet implemented' });
    }
});

// Add callback endpoint (basic)
app.post('/callback', (req, res) => {
    console.log('Callback received:', req.body);
    res.status(200).send('Callback received');
});