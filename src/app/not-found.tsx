import Link from 'next/link';
import { PageIntro } from '@/components/editorial/Primitives';
export default function NotFound() { return <><PageIntro label="A TURN IN THE ROAD / 404" title="A different path, perhaps?" description="This page isn't in our collection. There's plenty more Kerala to discover."/><div className="wrap pb-32"><Link href="/" className="button">Return to Kerala</Link></div></>; }
