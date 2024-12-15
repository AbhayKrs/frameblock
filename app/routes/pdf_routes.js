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
        const cssFilePath = path.join(process.cwd(), "app", "utils", "draftCSS.css");
        const cssContent = await fs.readFile(cssFilePath, 'utf-8');
        const filePath = path.join(process.cwd(), 'app', 'public', 'draft_file.pdf');

        const htmlContent = `
            <html>
                <head></head>
                <body>
                <style>${cssContent}</style>
                    ${req.body.content}
                </body>
            </html>
        `;
        console.log("htmlContent", htmlContent);


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