import { COURSE_TYPE } from '@/domain/constants';
import { CourseDisplayData, MenuDisplayData } from '@/domain/types';

export type AttachmentDto = {
  title: string;
  text?: string;
  image?: string;
};

const convertPlusMenus = (menus: MenuDisplayData[]) => {
  return menus.map((menu) => menu.name).join('\n');
};
const convertStandardMenus = (menus: MenuDisplayData[]) => {
  const menuNames = menus.map((menu) => menu.name).join('\n');
  const calory = menus
    .reduce((acc, menu) => acc + (menu.calory ?? 0), 0)
    .toFixed(2);
  const protein = menus
    .reduce((acc, menu) => acc + (menu.protein ?? 0), 0)
    .toFixed(2);

  return `${menuNames}

열량: ${calory} kcal
단백질: ${protein}g`;
};

const convertLunchboxMenus = (menus: MenuDisplayData[]) => {
  return menus
    .map((menu) => {
      const caloryText = menu.calory ? `\n${menu.calory.toFixed(2)} kcal` : '';
      const proteinText = menu.protein ? ` / ${menu.protein.toFixed(2)}g` : '';

      return `${menu.name}${caloryText}${proteinText}`;
    })
    .join('\n');
};

const getConverter = (type: COURSE_TYPE) => {
  switch (type) {
    case COURSE_TYPE.LUNCHBOX:
      return convertLunchboxMenus;
    case COURSE_TYPE.PLUS:
      return convertPlusMenus;
    default:
      return convertStandardMenus;
  }
};

export const convertCourseToAttachment = ({
  title,
  menus,
  type,
  imageUrl,
}: CourseDisplayData): AttachmentDto => {
  return { title: title, text: getConverter(type)(menus), image: imageUrl };
};
