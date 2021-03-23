import {
  Settings,
  Property,
  PropertyName,
  PropertySetting,
} from "../ConfigStyles";
import { ConfigModalProps, populationNumbers } from ".";
import { UIButton } from "./styles";
import Slider from "../Slider";

export function EnvironmentSettings({
  communityCount,
  onChangeCommunityCount,
  defaultCommunitySize,
  onChangeDefaultCommunitySize,
  onAddPopulation,
  onRemovePopulation,
}: ConfigModalProps) {
  return (
    <Settings>
      <Property>
        <PropertyName>Number of communities</PropertyName>
        <PropertySetting>
          <Slider
            min={1}
            max={49}
            value={communityCount}
            onChange={(v) => onChangeCommunityCount(v as number)}
          />
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Default size of communities</PropertyName>
        <PropertySetting>
          <Slider
            min={100}
            max={1500}
            value={defaultCommunitySize}
            onChange={(v) => onChangeDefaultCommunitySize(v as number)}
          />
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Add population to all</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton key={p} onClick={() => onAddPopulation(p)}>
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>

      <Property>
        <PropertyName>Remove population of all</PropertyName>
        <PropertySetting>
          {populationNumbers.map((p) => (
            <UIButton key={p} onClick={() => onRemovePopulation(p)}>
              {p}
            </UIButton>
          ))}
        </PropertySetting>
      </Property>
    </Settings>
  );
}
