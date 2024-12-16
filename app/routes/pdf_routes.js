import express from 'express';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
const router = express.Router();

// @desc    Create draft
// @route   GET /api/{version}/pdf/process
// @access  Public
router.post('/download', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'app', 'public', 'draft_file.pdf');
        // <style>${cssContent}</style>
        // <link rel="stylesheet" href="https://frameblock.onrender.com/dratCSS.css">
        console.log(filePath);

        const htmlContent = `
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://frameblock.onrender.com/draftCSS.css">
                    <title>${req.body.name}</title>
                </head>
                <body>
                    ${req.body.content}
                </body>
            </html>
        `;


        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        // Adjust the page content to fit the A4 size
        await page.addStyleTag({
            content: `
                body {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                }
                @page {
                    size: A4;
                    margin: 0;
                }
            `
        });

        // Generate the PDF
        await page.pdf({
            path: filePath,
            format: 'A4',
            printBackground: true,
            scale: 0.8,
            margin: {               // Adjust margins to avoid content clipping
                top: '10mm',
                bottom: '10mm',
                left: '10mm',
                right: '10mm'
            }
        });
        await browser.close();

        // Send the PDF as a downloadable file
        res.download(filePath, "download.pdf", (err) => {
            if (err) {
                console.error("Error while sending file:", err);
                res.status(500).send("Error while sending the file.");
            }
            // Clean up the temporary PDF file
            fs.unlink(filePath);
        });
    } catch (err) {
        res.status(500).send('Error generating PDF');
    }
});

export default router;