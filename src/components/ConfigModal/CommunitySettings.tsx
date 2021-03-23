import {
  Settings,
  Property,
  PropertyName,
  PropertySetting,
} from "../ConfigStyles";
import { UIButton } from "./styles";
import Slider from "../Slider";

import { useForceUpdate } from "../../utils";
import { ConfigModalProps, populationNumbers } from ".";

export function CommunitySettings({
  onAddPopulation,
  onRemovePopulation,
  communitySizes,
  onChangeCommunitySize,
  onChangePopularity,
  selectedCommunity,
}: ConfigModalProps) {
  const forceUpdate = useForceUpdate();

  if (selectedCommunity === null) return null;

  return (
    <Settings>
      <Property>
        <PropertyName>Add population</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton
              key={p}
              onClick={() => onAddPopulation(p, selectedCommunity)}
            >
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Remove population</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton
              key={p}
              onClick={() => onRemovePopulation(p, selectedCommunity)}
            >
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Community size</PropertyName>
        <PropertySetting>
          <Slider
            min={100}
            max={1500}
            value={communitySizes[selectedCommunity.id - 1]}
            onChange={(v) =>
              onChangeCommunitySize(selectedCommunity.id - 1, v as number)
            }
          />
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Community popularity</PropertyName>
        <PropertySetting>
          <Slider
            min={1}
            max={20}
            value={selectedCommunity.popularity}
            onChange={(v) => {
              onChangePopularity(selectedCommunity.id - 1, v as number);
              forceUpdate();
            }}
          />
        </PropertySetting>
      </Property>
    </Settings>
  );
}
