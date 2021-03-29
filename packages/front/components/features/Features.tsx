import React from 'react';

import { ClippedSection } from '../shared/styledComponents/ClippedSection';
import Feature from './Feature';
import FeaturesCarousel from './carousel/FeaturesCarousel';

// @ts-ignore
import mockup1 from '../../assets/mockup1.png';
// @ts-ignore
import mockup2 from '../../assets/mockup2.png';
// @ts-ignore
import mockup3 from '../../assets/mockup3.png';

const Features = () => {
  return (
    <ClippedSection className="bg-black text-gray-100 sm:my-10">
      <FeaturesCarousel>
        <Feature
          title="Simplest Bitcoin & cryptocurrency portfolio tracker. Without any redundant options."
          text="Create your acount and track your portfolio. It is simple as that."
          img={mockup1}
        />
        <Feature
          title="Account system"
          text="Every user has personal portfolio. You can add new assets to your portfolio using simplest form on earth. Just add items and monitor your assets."
          img={mockup2}
        />
        <Feature
          title="Nothing more..."
          text="It has no signals, no trade options. Nothing but your personal portfolio tracker. Monitor your portfolio without beeing disctupted by any redundant options."
          img={mockup3}
        />
      </FeaturesCarousel>
    </ClippedSection>
  );
};

export default Features;
