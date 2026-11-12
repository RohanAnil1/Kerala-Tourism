import { GUIDE_REVIEWED_AT, type GuideSource } from '@/data/guide-types';

export default function GuideSources({ sources, description, reviewedAt = GUIDE_REVIEWED_AT }: { sources: GuideSource[]; description?: string; reviewedAt?: string | null }) {
  return (
    <section id="sources" className="detail-section guide-sources" aria-labelledby="guide-sources-heading">
      <h2 id="guide-sources-heading">Sources & updates.</h2>
      <p>{description || 'This independent guide summarises the references below. Programmes, access and property arrangements can change.'}{reviewedAt && <> Reference review: <time dateTime={reviewedAt}>{reviewedAt}</time>.</>}</p>
      <ul>
        {sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span><span className="sr-only"> (external source, opens in a new tab)</span></a></li>)}
      </ul>
    </section>
  );
}
