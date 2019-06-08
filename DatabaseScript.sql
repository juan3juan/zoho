create DATABASE zohooauth;
use zohooauth;
CREATE TABLE
IF NOT EXISTS oauthtokens
(
useridentifier VARCHAR
(255),
accesstoken VARCHAR
(255),
refreshtoken VARCHAR
(255),
expirytime BIGINT
) ENGINE=INNODB;