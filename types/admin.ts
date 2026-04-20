/** Backend-aligned types for admin API */

export interface PlateDTO {
  id: number;
  uuid: string;
  name: string;
  description: string;
  price: string;
  category: string;
  is_featured: boolean;
  image: string;
  created_at: string;
  updated_at?: string | null;
}

export interface MenuResponseDTO {
  plates: PlateDTO[];
  total_count: number;
  categories: string[];
}

export interface StaffStatusResponse {
  user_uid: string;
  is_employee: boolean;
  is_admin: boolean;
  is_staff: boolean;
  role: string | null;
}

export interface TransactionsPageDTO {
  items: PointTransactionDTO[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface AddPointsBody {
  user_uid: string;
  purchase_amount: number;
}

export interface PointTransactionDTO {
  id: number;
  uuid: string;
  user_uid: string;
  added_by: string;
  points: number;
  created_at: string;
}

export interface PlatePhotoUploadResponseDTO {
  plate: PlateDTO;
  image_url: string;
}

export interface LookupUserByEmailResponse {
  user_uid: string;
  email: string;
}

export interface RewardDTO {
  id: number;
  uuid: string;
  name: string;
  description: string | null;
  points_required: number;
  image_url: string | null;
  created_at: string;
}

/** Staff list of reward redemptions (counter / admin) */
export interface ClaimStaffRowDTO {
  uuid: string;
  receipt_code: string;
  claimed_at: string;
  delivered_at: string | null;
  delivered_by_uid: string | null;
  user_uid: string;
  user_nickname: string | null;
  reward_name: string;
  points_spent: number;
}
