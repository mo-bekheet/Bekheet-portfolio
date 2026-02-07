const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Change this to your SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ message: 'CORS preflight response' }),
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { name, email, message } = JSON.parse(event.body);

    // Validate the input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Sanitize inputs
    const sanitizedInputs = {
      name: name.trim().substring(0, 100),
      email: email.trim().substring(0, 254),
      message: message.trim().substring(0, 5000),
    };

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedInputs.email)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Note: In a real implementation, you would save to Firestore here
    // For now, we're just logging the submission
    console.log('Contact form submission:', {
      name: sanitizedInputs.name,
      email: sanitizedInputs.email,
      message: sanitizedInputs.message,
      createdAt: new Date().toISOString(),
      ip: event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown',
      userAgent: event.headers['user-agent'] || 'unknown'
    });

    // Send email using nodemailer
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${sanitizedInputs.name}`,
      text: `Name: ${sanitizedInputs.name}\nEmail: ${sanitizedInputs.email}\n\nMessage:\n${sanitizedInputs.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedInputs.name}</p>
        <p><strong>Email:</strong> ${sanitizedInputs.email}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedInputs.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Message sent successfully!'
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Failed to send message',
        details: error.message 
      }),
    };
  }
};