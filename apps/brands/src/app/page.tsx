import { CmsMainFromCache } from "@/components/CmsMainFromCache";
import {
  CMS_HOME_PATH,
  publishMetadataForPath,
} from "@/lib/server/cms-route";

export async function generateMetadata() {
  return publishMetadataForPath(CMS_HOME_PATH);
}

export default function HomePage() {
  return <CmsMainFromCache pathname={CMS_HOME_PATH} />;
}
