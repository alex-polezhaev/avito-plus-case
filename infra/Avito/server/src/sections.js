/**
 * @module Avito
 * @file Object describing the sections an Avito ad can be in
 * @name sections
 * @description The sections were extracted from Swagger, but it turned out over time
 * that not all sections are present in Swagger.
 * @see https://developers.avito.ru/api-catalog/autoload/documentation
 */

export default {
  success_added: 'The ad was added to the site in the last autoload cycle',
  success_activated: 'The ad was activated from previously unpublished or finished ads',
  success_activated_updated: 'The ad was activated from previously unpublished or finished ads and edited',
  success_updated: 'The ad was edited',
  success_skipped: 'In this autoload cycle the ad was kept active on the site without changes',
  problem_obsolete: 'The ad in the XML uses an outdated format',
  problem_params_critical: 'Errors related to the description or parameter values occurred while processing the ad. If they are not fixed, the ad will disappear from the site after some time',
  problem_params: 'Errors related to the description or parameter values occurred while processing the ad',
  problem_phone: 'Problems with the phone number in the contact information',
  problem_images: 'Errors occurred while placing the photos',
  problem_vas: 'Errors occurred while activating additional services',
  problem_other: 'An error occurred while processing the ad',
  problem_several: 'Several different errors occurred while processing the ad',
  error_fee: 'The ad was not published due to listing payment problems',
  error_params: 'Could not be published due to errors related to the description or parameter values',
  error_phone: 'Could not be published due to problems with the phone number in the contact information',
  error_rejected: 'The ad was rejected by moderation due to site rule violations',
  error_blocked: 'The ad was blocked by moderation due to site rule violations',
  error_deleted: 'The ad cannot be processed because an ad with this ID (in the XML file) was previously deleted from the site',
  error_other: 'An error occurred while publishing the ad',
  error_several: 'Several different errors occurred while publishing the ad',
  stopped_end_date_complete: 'Not published or unpublished because the exposure period specified in the XML file expired',
  stopped_end_date_error: 'Errors occurred while trying to unpublish',
  date_in_future: 'Not published or unpublished because the exposure start date specified in the XML file has not arrived yet',
  publish_later: 'Not added to the site due to the limit on the number of ads published per cycle. If you want to change the autoload mode of your ads, contact Avito support',
  linker: 'Ads similar to those previously posted via the Avito personal account that require a decision: merge with the existing one or publish as a new ad',
  removed_complete: 'The ad was unpublished (finished) because it was removed from the XML file',
  removed_error: 'Errors while trying to unpublish',
  need_sync: 'The ad is waiting to sync with the site',
  duplicate: 'The ads have identical descriptions',
  without_id: 'The ad has no identifier',
  // At the time the sections were extracted from Swagger, the sections below did not exist
  stopped_by_expiration: 'The listing period has expired',
  error_fee_hard_limit: 'Limit due to publishing duplicate ads',
};
