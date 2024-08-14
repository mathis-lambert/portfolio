const HTMLString = ({ html }: { html: string }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
);

export default HTMLString;