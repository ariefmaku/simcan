ALTER TABLE `trx_rkpd_rpjmd_program_pelaksana` DROP INDEX `idx_trx_rkpd_rpjmd_program_pelaksana`;
ALTER TABLE `trx_rkpd_rpjmd_program_pelaksana` ADD UNIQUE INDEX `idx_trx_rkpd_rpjmd_program_pelaksana`(`tahun_rkpd`, `id_rkpd_rpjmd`, `id_urbid_rpjmd`, `id_unit`) USING BTREE;