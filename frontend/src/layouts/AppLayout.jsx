import NavBar from '../components/ui/NavBar';
import OfflineIndicator from '../components/ui/OfflineIndicator';
import PageHeader from '../components/ui/PageHeader';

// Every page renders inside this layout. Keeping NavBar + the header row +
// OfflineIndicator here — rather than duplicated per page — is what
// guarantees the five pages can't visually drift apart from each other.
export default function AppLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between">
          <PageHeader title={title} subtitle={subtitle} />
          <OfflineIndicator />
        </div>
        {children}
      </main>
    </div>
  );
}
