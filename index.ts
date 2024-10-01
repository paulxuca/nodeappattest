import express from "express";
import { verifyAttestation, verifyAssertion } from "node-app-attest";

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
    if (req.body.type === 'attestation') {
        try {
            const r = verifyAttestation({
                ...req.body.params,
                attestation: Buffer.from(req.body.params.attestation, 'base64'),
            });
    
            res.status(200).json(r);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }

        return;
    }

    if (req.body.type === 'assertion') {
        try {
            const r = verifyAssertion({
                ...req.body.params,
                assertion: Buffer.from(req.body.params.assertion, 'base64'),
            });
    
            res.status(200).json(r);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }

        return;
    }

    res.status(500).json({ error: "Invalid type" });
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
