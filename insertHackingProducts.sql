USE denoshop;

INSERT INTO `denoshop`.`categories` (`id`, `category`) VALUES ('1', 'outfits');
INSERT INTO `denoshop`.`categories` (`id`, `category`) VALUES ('2', 'tools');


INSERT INTO `denoshop`.`hackingProducts` (`id`, `price`, `imageFile`, `dateAdded`, `title`, `description`, `category`, `quantity`) 
VALUES ('1', '10', '[\"https://res.cloudinary.com/dchpyunul/image/upload/v1595087406/denoshop/hackingProducts/outfits/300-300-max_fuhw8x.jpg\"]', '2020-07-05 05:15:49', 'Deno Cap', 'Elegant and simple cap empower your imagination.', 'outfits', '20');

INSERT INTO `denoshop`.`hackingProducts` (`id`, `price`, `imageFile`, `dateAdded`, `title`, `description`, `category`, `quantity`) 
VALUES ('2', '40', '[\"https://res.cloudinary.com/dchpyunul/image/upload/v1595087407/denoshop/hackingProducts/outfits/300-300-maxout_kakwk7.jpg\"]', '2020-07-05 05:15:49', 'Deno Hoodie', 'The hoodie you need to keep youself cozy while coding.', 'outfits', '40');

INSERT INTO `denoshop`.`hackingProducts` (`id`, `price`, `imageFile`, `dateAdded`, `title`, `description`, `category`, `quantity`) 
VALUES ('3', '20', '[\"https://res.cloudinary.com/dchpyunul/image/upload/v1595087413/denoshop/hackingProducts/tools/300-300-maxar_wydfde.jpg\"]', '2020-07-05 05:15:49', 'Arduino', 'The old but powerful micro-controller that every hacker should have one on their bell', 'tools', '240');

INSERT INTO `denoshop`.`hackingProducts` (`id`, `price`, `imageFile`, `dateAdded`, `title`, `description`, `category`, `quantity`) 
VALUES ('4', '50', '[\"https://res.cloudinary.com/dchpyunul/image/upload/v1595087415/denoshop/hackingProducts/tools/300-300-maxRa_vopg5q.jpg\"]', '2020-07-05 05:15:49', 'Raspberry Pi 4', 'Powerful but affordable credit-card size computer we all love!', 'tools', '430');
