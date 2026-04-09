export interface SearchParams {
  live_preview?: string;
  content_type_uid?: string;
  entry_uid?: string;
  preview_timestamp?: string;
}

export interface PreviewPageProps {
  searchParams: Promise<SearchParams>;
}
