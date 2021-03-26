import { FaUsers, FaGlobeAmericas } from "react-icons/fa";

import Community from "../../objects/Community";
import { Title } from "../ConfigStyles";
import { UnselectedBox } from "./styles";
import Modal from "./Modal";

import { CommunitySettings } from "./CommunitySettings";
import { EnvironmentSettings } from "./EnvironmentSettings";

export interface ConfigModalProps {
  onAddPopulation: (n: number, c?: Community) => void;
  onRemovePopulation: (n: number, c?: Community) => void;

  selectedCommunity: Community | null;
  communityCount: number;
  onChangeCommunityCount: (n: number) => void;

  defaultCommunitySize: number;
  onChangeDefaultCommunitySize: (n: number) => void;

  communitySizes: number[];
  onChangeCommunitySize: (index: number, size: number) => void;

  onChangePopularity: (index: number, p: number) => void;

  onFinish: () => void;
  hidden: boolean;
}

export const populationNumbers = [1, 5, 10, 50, 100];

export default function ConfigModal(props: ConfigModalProps) {
  const { selectedCommunity, onFinish, hidden } = props;

  return (
    <Modal onNext={onFinish} hidden={hidden}>
      <Title>
        <FaGlobeAmericas />
        Environment settings
      </Title>
      <EnvironmentSettings {...props} />

      <Title>
        <FaUsers />
        Community {selectedCommunity && selectedCommunity.id} settings
      </Title>
      {selectedCommunity !== null ? (
        <CommunitySettings {...props} />
      ) : (
        <UnselectedBox>Click a community to configure</UnselectedBox>
      )}
    </Modal>
  );
}
