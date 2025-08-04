// TODO: add multilang support
import { useScrollToTop } from '#src/lib';
import AppRouter from '#src/routes/AppRouter';

export default function App() {
  useScrollToTop({ watchParams: ['page'] });
  return <AppRouter />;
}
