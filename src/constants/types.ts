export type ICompanies = {
  price: number;
  color: string;
};

export type Backblaze = {
  storagePrice: number;
  transferPrice: number;
  minPayment: number;
};

export type Bunny = {
  storagePrice: {
    hdd: number;
    ssd: number;
  };
  transferPrice: number;
  maxPayment: number;
};

export type Rate = {
  free: number;
  overLimit: number;
};

export type Scaleway = {
  storagePrice: {
    multy: Rate;
    single: Rate;
  };
  transferPrice: Rate;
};

export type Vultr = {
  storagePrice: number;
  transferPrice: number;
  minPayment: number;
};

export type Screens = {
  screenWidth960: number;
  screenWidth414: number;
};
