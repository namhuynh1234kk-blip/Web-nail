import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Cache Ethereal test account if using test mode
  let testAccount: nodemailer.TestAccount | null = null;

  async function getTransporter() {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;

    if (host && user && pass) {
      return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    }

    // Fallback to Ethereal account or mock stream for testing & instant preview
    if (!testAccount) {
      try {
        testAccount = await nodemailer.createTestAccount();
      } catch (err) {
        console.warn('[EMAIL WARNING] Could not create Ethereal test account, using direct mock transport', err);
        return nodemailer.createTransport({
          jsonTransport: true,
        });
      }
    }

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // API Route: Send Email Confirmation
  app.post('/api/send-email', async (req, res) => {
    try {
      const { to, appointment } = req.body;

      if (!to || !appointment) {
        return res.status(400).json({ error: 'Missing required parameters (to, appointment)' });
      }

      const transporter = await getTransporter();
      const fromAddress = process.env.SMTP_FROM || 'Lumé Beauty & Spa <xacnhan@lumespa.vn>';

      const servicesHtml = (appointment.selectedServices || [])
        .map(
          (s: any) =>
            `<tr style="border-bottom: 1px solid #f0e6dc;">
              <td style="padding: 10px 0; font-[#3a2f2a]; font-[#3a2f2a]; font-size: 14px;">${s.title} (${s.duration} phút)</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; font-size: 14px; color: #b08d4f;">${new Intl.NumberFormat('vi-VN').format(s.price)}đ</td>
            </tr>`
        )
        .join('');

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Xác Nhận Lịch Hẹn Lumé Spa</title>
        </head>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f1eb; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2d7cb; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <div style="background-color: #3a2f2a; padding: 30px; text-align: center;">
              <h1 style="color: #c9a86c; margin: 0; font-size: 26px; letter-spacing: 2px; text-transform: uppercase;">LUMÉ BEAUTY & SPA</h1>
              <p style="color: #ebe3d9; font-size: 13px; margin-top: 5px; font-style: italic;">Tỏa Sáng Vẻ Đẹp Tự Nhiên</p>
            </div>

            <!-- Content -->
            <div style="padding: 30px; color: #3a2f2a;">
              <h2 style="font-size: 18px; margin-top: 0; color: #3a2f2a;">Xin chào, ${appointment.customerName}!</h2>
              <p style="font-size: 14px; color: #6b5c54; line-height: 1.6;">
                Cảm ơn bạn đã lựa chọn dịch vụ chăm sóc sắc đẹp tại <strong>Lumé Beauty & Spa</strong>. Dưới đây là thông tin chi tiết vé xác nhận đặt lịch hẹn của bạn:
              </p>

              <!-- Ticket Box -->
              <div style="background-color: #faf6f2; border: 1px dashed #c9a86c; border-radius: 16px; padding: 20px; margin: 25px 0;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #e8dfd5; padding-bottom: 12px; margin-bottom: 15px;">
                  <div>
                    <span style="font-size: 11px; font-weight: bold; color: #c9a86c; text-transform: uppercase;">MÃ ĐẶT LỊCH</span><br>
                    <span style="font-family: monospace; font-size: 20px; font-weight: bold; color: #3a2f2a;">#${appointment.id}</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="display: inline-block; background-color: #d1fae5; color: #065f46; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 20px;">
                      ĐÃ XÁC NHẬN
                    </span>
                  </div>
                </div>

                <table style="width: 100%; font-size: 13px; color: #3a2f2a; margin-bottom: 15px;" cellpadding="6">
                  <tr>
                    <td style="color: #6b5c54; width: 35%;"><strong>Ngày hẹn:</strong></td>
                    <td><strong>${appointment.date}</strong></td>
                  </tr>
                  <tr>
                    <td style="color: #6b5c54;"><strong>Khung giờ:</strong></td>
                    <td><strong>${appointment.timeSlot}</strong></td>
                  </tr>
                  <tr>
                    <td style="color: #6b5c54;"><strong>Chi nhánh:</strong></td>
                    <td>${appointment.branch}</td>
                  </tr>
                  <tr>
                    <td style="color: #6b5c54;"><strong>KTV / Chuyên gia:</strong></td>
                    <td>${appointment.specialistName}</td>
                  </tr>
                  <tr>
                    <td style="color: #6b5c54;"><strong>Số điện thoại:</strong></td>
                    <td>${appointment.customerPhone}</td>
                  </tr>
                </table>

                <div style="border-top: 1px solid #e8dfd5; pt: 15px; margin-top: 15px;">
                  <strong style="font-size: 13px; color: #3a2f2a; display: block; margin-bottom: 8px;">Dịch vụ đã chọn:</strong>
                  <table style="width: 100%; border-collapse: collapse;">
                    ${servicesHtml}
                  </table>
                  <div style="text-align: right; margin-top: 15px; font-size: 16px; font-weight: bold; color: #b08d4f;">
                    Tổng tiền: ${new Intl.NumberFormat('vi-VN').format(appointment.finalPrice)}đ
                  </div>
                </div>
              </div>

              <!-- Important Notes -->
              <div style="background-color: #f7f1eb; border-radius: 12px; padding: 15px; font-size: 12px; color: #6b5c54; line-height: 1.5;">
                <strong style="color: #3a2f2a;">Lưu ý khi đến Spa:</strong>
                <ul style="margin: 5px 0 0 0; padding-left: 20px;">
                  <li>Vui lòng đến trước giờ hẹn 10 phút để được đón tiếp chu đáo nhất.</li>
                  <li>Nếu có nhu cầu đổi giờ hoặc thay đổi thông tin, quý khách có thể tra cứu lịch trên website hoặc liên hệ hotline.</li>
                </ul>
              </div>

              <!-- Signature -->
              <p style="font-size: 13px; color: #6b5c54; margin-top: 30px; line-height: 1.6;">
                Trân trọng,<br>
                <strong>Đội ngũ Lumé Beauty & Spa</strong><br>
                Hotline: 0901 234 567
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f0e6dc; padding: 15px; text-align: center; font-size: 11px; color: #8c7b70;">
              © ${new Date().getFullYear()} Lumé Beauty & Spa. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `;

      const info = await transporter.sendMail({
        from: fromAddress,
        to,
        subject: `[LUMÉ SPA] Xác Nhận Lịch Hẹn Thành Công #${appointment.id}`,
        html: htmlContent,
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);

      console.log(`[EMAIL DISPATCH] Sent email to ${to}. MessageId: ${info.messageId}`);
      if (previewUrl) {
        console.log(`[EMAIL TEST PREVIEW] ${previewUrl}`);
      }

      return res.json({
        success: true,
        messageId: info.messageId,
        previewUrl: previewUrl || null,
        recipient: to,
      });
    } catch (err: any) {
      console.error('[EMAIL ERROR]', err);
      return res.status(500).json({
        error: 'Lỗi khi gửi email xác nhận',
        details: err?.message || String(err),
      });
    }
  });

  // Vite Middleware in Dev Mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
