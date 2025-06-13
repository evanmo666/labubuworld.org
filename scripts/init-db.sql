-- Labubu系列信息表
CREATE TABLE IF NOT EXISTS "Series" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "releaseDate" DATE,
  "description" TEXT,
  "coverImageUrl" VARCHAR(255)
);

-- 系列中的单个玩偶信息表
CREATE TABLE IF NOT EXISTS "Figure" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "imageUrl" VARCHAR(255),
  "isSecret" BOOLEAN DEFAULT FALSE,
  "seriesId" INTEGER NOT NULL,
  FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE
);

-- 新闻文章表
CREATE TABLE IF NOT EXISTS "NewsPost" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "content" TEXT NOT NULL,
  "publishedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "imageUrl" VARCHAR(255)
);

-- 插入初始系列数据
INSERT INTO "Series" (name, slug, "releaseDate", description, "coverImageUrl") VALUES
('Artist Series', 'art-series', '2022-08-19', 'A series featuring The Monsters family members integrated into world famous paintings.', '/images/series/art-series-cover.jpg'),
('Macaron Series', 'macaron-series', '2023-04-07', 'A sweet and colorful series inspired by delicious macarons.', '/images/series/macaron-series-cover.jpg'),
('SpongeBob Collaboration', 'spongebob-series', '2023-06-21', 'A crossover collaboration series with the SpongeBob SquarePants world.', '/images/series/spongebob-series-cover.jpg')
ON CONFLICT (slug) DO NOTHING;

-- 插入"艺术家系列"的玩偶数据 (seriesId = 1)
INSERT INTO "Figure" (name, "seriesId", "isSecret") VALUES
('Discus Thrower', 1, false), 
('Van Gogh', 1, false), 
('The Scream', 1, false), 
('Son of Man', 1, false), 
('Mona Lisa', 1, false), 
('Girl with a Pearl Earring', 1, false), 
('The Thinker', 1, false), 
('The Fifer', 1, false), 
('Joker', 1, false), 
('Napoleon', 1, false), 
('David', 1, false), 
('Pierrot', 1, false), 
('Birth of Venus', 1, true)
ON CONFLICT DO NOTHING;

-- 插入"心动马卡龙系列"的玩偶数据 (seriesId = 2)
INSERT INTO "Figure" (name, "seriesId", "isSecret") VALUES
('Soy Milk Macaron', 2, false), 
('Lychee Berry Macaron', 2, false), 
('Pistachio Macaron', 2, false), 
('Grape Macaron', 2, false), 
('Black Sesame Macaron', 2, false), 
('Avocado Macaron', 2, false), 
('Raspberry Macaron', 2, false), 
('Sea Salt Coconut Macaron', 2, false), 
('Lemon Macaron', 2, false), 
('Rose Macaron', 2, false), 
('Coffee Macaron', 2, false), 
('Orange Macaron', 2, false), 
('Chestnut Cocoa Macaron', 2, true)
ON CONFLICT DO NOTHING;

-- 插入一篇新闻文章
INSERT INTO "NewsPost" (title, slug, content, "imageUrl") VALUES
('Why is Labubu So Popular?', 'why-is-labubu-popular', 'The rise of Labubu can be described as a phenomenon. Created by artist Kasing Lung, this mischievous elf has captured the hearts of collectors worldwide...', '/images/news/labubu-popular.jpg')
ON CONFLICT (slug) DO NOTHING; 