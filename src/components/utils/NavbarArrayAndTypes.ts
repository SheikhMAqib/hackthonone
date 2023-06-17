export interface NavbarItemType {
  label: string;
  href: string;
  isDropDown: boolean;
  dropDownData?: Array<NavbarItemType>;
}

export const NavbarArray: Array<NavbarItemType> = [
  {
    label: "Female",
    href: "/female/Female",
    isDropDown: true,
    dropDownData: [
      {
        label: "Dresses",
        href: "/female/Dresse",
        isDropDown: false,
      },
      {
        label: "T-Shirts",
        href: "/female/T-shirts",
        isDropDown: false,
      },
      {
        label: "Pents",
        href: "/female/Pent",
        isDropDown: false,
      },
      {
        label: "Jeckets",
        href: "/female/Jacket",
        isDropDown: false,
      },
      {
        label: "Sweaters",
        href: "/female/Sweater",
        isDropDown: false,
      }
    ],
  },
  {
    label: "Male",
    href: "/male/Male",
    isDropDown: true,
    dropDownData: [
      {
        label: "Sweaters",
        href: "/male/Sweater",
        isDropDown: false,
      },
      {
        label: "Jeckets",
        href: "/male/Jacket",
        isDropDown: false,
      },
    ],
  },
  {
    label: "Kids",
    href: "/Kids",
    isDropDown: false,
  },
  {
    label: "All Product",
    href: "/products",
    isDropDown: false,
  },
];
