import { CALORY_IDX, PROTEIN_IDX } from "@/infrastructure/constants";

const getIndices = () =>  ({
  nameIdx: 0, // 메뉴 이름은 항상 0번 인덱스
  caloryIdx: CALORY_IDX,
  proteinIdx: PROTEIN_IDX
});

export default getIndices;