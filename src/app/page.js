export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Notion API Server</h1>
      <p>This is an API server for Notion content. Use the following endpoints:</p>
      <ul>
        <li><code>/api/money-basics</code> - Money basics categories and articles</li>
        <li><code>/api/etfs</code> - ETF articles</li>
        <li><code>/api/debts</code> - Debt articles</li>
        <li><code>/api/mind-over-money</code> - Mind over money articles</li>
      </ul>
      <p>See <code>NOTION_SERVER_README.txt</code> for detailed API documentation.</p>
    </div>
  );
}
