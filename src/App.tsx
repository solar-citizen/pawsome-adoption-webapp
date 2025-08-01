// TODO: add multilang support
import AppRouter from '#src/routes/AppRouter';
import { useScrollToTop } from '#src/lib';

export default function App() {
  useScrollToTop();
  return <AppRouter />;
}
