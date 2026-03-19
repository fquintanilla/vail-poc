import type { Action, Image } from './action';
import type { SectionProps } from './section';

type SectionDollar = SectionProps['$'];

export type SectionWithBucket = {
  bucket_tabular: boolean;
  title_h2: string;
  buckets: BucketList;
  description: string;
  $: SectionDollar;
};

type BucketList = [
  BucketArray: {
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    icon: Image;
    $: SectionDollar;
  },
];
