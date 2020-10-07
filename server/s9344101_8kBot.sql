-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 07, 2020 at 02:03 PM
-- Server version: 5.7.31-log
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s9344101_8kBot`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `djh` int(11) NOT NULL,
  `id` bigint(20) NOT NULL,
  `json` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`djh`, `id`, `json`) VALUES
(16, 538719084804702208, '{\"bal\":1018,\"name\":\"The Panic Filled Idiot#5052\",\"cooldown\":{\"beg\":{\"started\":1601643379143,\"ms\":10000}},\"inv\":{},\"id\":\"538719084804702208\"}'),
(15, 646122652485943296, '{\"bal\":1000,\"name\":\"Marvin The Magnificent\'s Wife#8742\",\"cooldown\":{\"beg\":{\"started\":1601603736106,\"ms\":10000}},\"inv\":{},\"id\":\"646122652485943296\"}'),
(21, 566662215457964043, '{\"bal\":56252,\"name\":\"Coder Gautam#0234\",\"cooldown\":{\"beg\":{\"started\":1601751319921,\"ms\":10000}},\"inv\":{\"apple\":{\"amount\":2}},\"id\":\"566662215457964043\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(17, 577585117560569866, '{\"bal\":670,\"name\":\"anandv#4789\",\"cooldown\":{\"beg\":{\"started\":1601689550328,\"ms\":10000}},\"inv\":{\"apple\":{\"amount\":1}},\"id\":\"577585117560569866\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(18, 609886267307589633, '{\"bal\":195,\"name\":\"just a random idiot#1816\",\"cooldown\":{\"beg\":{\"started\":1601648461240,\"ms\":10000}},\"inv\":{\"apple\":{\"amount\":1}},\"id\":\"609886267307589633\"}'),
(19, 519240320425394196, '{\"bal\":36623,\"name\":\"NO U!#9896\",\"cooldown\":{\"beg\":{\"started\":1601748869377,\"ms\":10000}},\"inv\":{},\"id\":\"519240320425394196\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(20, 716047916271272007, '{\"bal\":117047,\"name\":\"Zacerfice#3797\",\"cooldown\":{\"beg\":{\"started\":1601731664523,\"ms\":10000}},\"inv\":{},\"id\":\"716047916271272007\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(22, 712424219316846673, '{\"bal\":104462,\"name\":\"StratisYT#9595\",\"cooldown\":{\"beg\":{\"started\":1601748470623,\"ms\":10000}},\"inv\":{},\"id\":\"712424219316846673\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(23, 202733560963006464, '{\"bal\":97,\"name\":\"Schneider#9999\",\"cooldown\":{\"beg\":{\"started\":1601657024610,\"ms\":10000}},\"inv\":{\"apple\":{\"amount\":2}},\"id\":\"202733560963006464\"}'),
(24, 521024881953996803, '{\"bal\":1000,\"name\":\"Lifeindark#9058\",\"cooldown\":{},\"inv\":{},\"id\":\"521024881953996803\"}'),
(25, 671544116542308352, '{\"bal\":1306,\"name\":\"Create Your Life#8118\",\"cooldown\":{\"beg\":{\"started\":1601689310644,\"ms\":10000}},\"inv\":{\"apple\":{\"amount\":2}},\"id\":\"671544116542308352\"}'),
(26, 623653060647977018, '{\"bal\":1000,\"name\":\"Floydian99#6007\",\"inv\":{},\"id\":\"623653060647977018\"}'),
(29, 580307932571238424, '{\"bal\":2917,\"name\":\"ðŸ…°ðŸ†ˆðŸ†„ðŸ†‚ðŸ…· {á´˜á´‡Ê€sá´á´€É´á´€ Éªá´á´˜á´Ê€á´›á´€É´á´›á´€}#9999\",\"inv\":{},\"id\":\"580307932571238424\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(27, 584774674962186250, '{\"bal\":1189,\"name\":\"ð™™ Ñugs.js | [DÎ›RKSIDÎž]#6897\",\"inv\":{},\"id\":\"584774674962186250\"}'),
(28, 748373656425725971, '{\"bal\":2642,\"name\":\"Nizy#2836\",\"inv\":{},\"id\":\"748373656425725971\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(30, 469929499530887207, '{\"bal\":15667,\"name\":\"Cloudzy#1930\",\"inv\":{},\"id\":\"469929499530887207\",\"job\":{\"exists\":true,\"name\":\"teacher\"}}'),
(31, 745533773046874244, '{\"bal\":1000,\"name\":\"ã€¢Î”G99|ã€ŽCYCLOã€#9900\",\"inv\":{},\"id\":\"745533773046874244\"}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`djh`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `djh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
