const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Try to read from .env.local or command line argument
let connectionString = process.env.CHAT__POSTGRES_URL || process.argv[2];

if (!connectionString) {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/CHAT__POSTGRES_URL=(.+)/);
      if (match) {
        connectionString = match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch (error) {
    // Ignore
  }
}

if (!connectionString) {
  console.error('❌ CHAT__POSTGRES_URL not found.');
  console.error('\nUsage:');
  console.error('  node scripts/query-chat-db.js');
  console.error('  node scripts/query-chat-db.js "postgres://connection-string"');
  console.error('\nOr set it in .env.local:');
  console.error('  CHAT__POSTGRES_URL="postgres://connection-string"');
  process.exit(1);
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function queryDatabase() {
  try {
    console.log('🔍 Querying chat database...\n');

    // First check if tables exist
    const tablesCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('chat_messages', 'chat_customers', 'chat_sessions')
    `);

    if (tablesCheck.rows.length === 0) {
      console.log('❌ Database tables do not exist yet!');
      console.log('\n📋 Please initialize the database first:');
      console.log('   Visit: https://your-domain.com/api/chat/init-db');
      console.log('   Or run: curl https://your-domain.com/api/chat/init-db\n');
      await pool.end();
      return;
    }

    console.log(`✅ Found ${tablesCheck.rows.length} table(s): ${tablesCheck.rows.map(r => r.table_name).join(', ')}\n`);

    // Get recent messages
    const messagesResult = await pool.query(`
      SELECT 
        id,
        customer_id,
        text,
        sender,
        timestamp,
        telegram_message_id
      FROM chat_messages
      ORDER BY timestamp DESC
      LIMIT 20
    `);

    console.log('📨 Recent Messages (Last 20):');
    console.log('='.repeat(80));
    messagesResult.rows.forEach((msg, index) => {
      console.log(`\n${index + 1}. [${msg.sender.toUpperCase()}] ${msg.timestamp.toISOString()}`);
      console.log(`   Customer ID: ${msg.customer_id}`);
      console.log(`   Text: ${msg.text.substring(0, 100)}${msg.text.length > 100 ? '...' : ''}`);
      console.log(`   Telegram Msg ID: ${msg.telegram_message_id || 'N/A'}`);
    });

    // Get admin messages specifically
    const adminResult = await pool.query(`
      SELECT 
        id,
        customer_id,
        text,
        timestamp,
        telegram_message_id
      FROM chat_messages
      WHERE sender = 'admin'
      ORDER BY timestamp DESC
      LIMIT 10
    `);

    console.log('\n\n👤 Admin Messages (Last 10):');
    console.log('='.repeat(80));
    if (adminResult.rows.length === 0) {
      console.log('❌ No admin messages found in database!');
    } else {
      adminResult.rows.forEach((msg, index) => {
        console.log(`\n${index + 1}. ${msg.timestamp.toISOString()}`);
        console.log(`   Customer ID: ${msg.customer_id}`);
        console.log(`   Text: ${msg.text.substring(0, 100)}${msg.text.length > 100 ? '...' : ''}`);
        console.log(`   Telegram Msg ID: ${msg.telegram_message_id || 'N/A'}`);
      });
    }

    // Get recent customers
    const customersResult = await pool.query(`
      SELECT 
        id,
        name,
        email,
        phone,
        created_at
      FROM chat_customers
      ORDER BY created_at DESC
      LIMIT 10
    `);

    console.log('\n\n👥 Recent Customers (Last 10):');
    console.log('='.repeat(80));
    customersResult.rows.forEach((customer, index) => {
      console.log(`\n${index + 1}. ${customer.name} (${customer.email})`);
      console.log(`   Customer ID: ${customer.id}`);
      console.log(`   Phone: ${customer.phone}`);
      console.log(`   Created: ${customer.created_at.toISOString()}`);
    });

    // Summary
    const summaryResult = await pool.query(`
      SELECT 
        COUNT(*) as total_messages,
        COUNT(CASE WHEN sender = 'admin' THEN 1 END) as admin_messages,
        COUNT(CASE WHEN sender = 'customer' THEN 1 END) as customer_messages
      FROM chat_messages
    `);

    console.log('\n\n📊 Summary:');
    console.log('='.repeat(80));
    const summary = summaryResult.rows[0];
    console.log(`Total Messages: ${summary.total_messages}`);
    console.log(`Admin Messages: ${summary.admin_messages}`);
    console.log(`Customer Messages: ${summary.customer_messages}`);

    await pool.end();
    console.log('\n✅ Query complete!\n');
  } catch (error) {
    console.error('❌ Error querying database:', error);
    await pool.end();
    process.exit(1);
  }
}

queryDatabase();

