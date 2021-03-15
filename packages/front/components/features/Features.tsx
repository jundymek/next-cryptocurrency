import React from 'react';

import { ClippedSection } from '../shared/styledComponents/ClippedSection';
import Feature from './Feature';
import FeaturesCarousel from './carousel/FeaturesCarousel';

const Features = () => {
  return (
    <ClippedSection className="bg-black text-gray-100 h-full sm:my-10">
      <FeaturesCarousel>
        <Feature
          title="The world's most popular Bitcoin & cryptocurrency portfolio tracker. Now with trading."
          text="Track your portfolio, get Blockfolio Signal updates from top teams, and buy and sell
          crypto with zero fees."
        />
        <Feature
          title="Connect to Blockfolio with your favorite messaging apps"
          text="Automatically receive the latest real-time Blockfolio Signal updates and pricing straight
              to your Slack groups"
        />
        <Feature
          title="3 feature"
          text="Automatically receive the latest real-time Blockfolio Signal updates and pricing straight
              to your Slack groups"
        />
      </FeaturesCarousel>
    </ClippedSection>
  );
};

export default Features;
