const express = require('express');
const db = require('../models/index')
const router = express.Router();

router.get('/', async (req, res, next) => {
    const checks = {
        database: false,
        secret: false
    };
    const errors = [];

    // Check database connection
    try {
        await db.Measurement.findAll();
        checks.database = true;
    } catch (err) {
        errors.push(`Database: ${err.message}`);
    }

    // Check secret
    const secret = process.env.PASSPHRASE || null;
    if (secret) {
        checks.secret = true;
    } else {
        errors.push('Secret could not be read');
    }

    // Return combined result
    if (checks.database && checks.secret) {
        res.status(200).json({
            message: 'OK: All health checks passed',
            checks
        });
    } else {
        res.status(500).json({
            error: 'NOK: Some health checks failed',
            checks,
            errors
        });
    }
})

// get method - health check - check if the database is connected
router.get('/database', (req, res, next) => {
    db.Measurement.findAll()
        .then(() => {
            res.status(200).json({
                message: 'OK: Database is connected',
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "NOK: Internal server error - database could NOT be connected. Details: " + err
            });
        })
})

// get method - secret check - check if secret can be read
router.get('/secret', (req, res, next) => {
    const secret = process.env.PASSPHRASE || null

    if (secret) {
        res.status(200).json({
            message: "OK: Secret can be read"
        })
    } else {
        res.status(500).json({
            error: "NOK: Secret could NOT be read"
        })
    }
})

module.exports = router;
