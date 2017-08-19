/*jslint browser: true*/
/*global $, jQuery, alert*/

define(['underscore'], function (_) {
    $(document).ready(function () {
        'use strict';

        var WORK_STATUS = {
            NOT_WFH: 0,
            FIRST_HALF_WFH: 1,
            SECOND_HALF_WFH: 2,
            FULL_DAY_WFH: 3
        };

        var monthlyWorkStatus = new Array(31);

        function init() {
            monthlyWorkStatus.fill(WORK_STATUS.NOT_WFH);

            monthlyWorkStatus[1] = WORK_STATUS.SECOND_HALF_WFH;
            monthlyWorkStatus[2] = WORK_STATUS.FULL_DAY_WFH;
            monthlyWorkStatus[3] = WORK_STATUS.FULL_DAY_WFH;
            monthlyWorkStatus[4] = WORK_STATUS.FIRST_HALF_WFH;

            var i;
            for (i = 0; i < monthlyWorkStatus.length; i++) {
                var id = "#x" + (i + 1);

                switch (monthlyWorkStatus[i]) {
                    case WORK_STATUS.NOT_WFH:
                        break;
                    case WORK_STATUS.FIRST_HALF_WFH:
                        $(id).toggleClass('fa-star-o fa-star-half-o');
                        break;
                    case WORK_STATUS.SECOND_HALF_WFH:
                        $(id).toggleClass('fa-star-o fa-star-half-o fa-flip-horizontal');
                        break;
                    case WORK_STATUS.FULL_DAY_WFH:
                        $(id).toggleClass('fa-star-o fa-star');
                        console.log($(id).attr('class'));
                        break;
                    default:
                        break;
                }
            }
        }

        /* Initialize Calendar */
        init();

        var toggleStatus = true;

        $('#view-toggle').change(function () {
            if ($(this).prop('checked')) {
                toggleStatus = true;
            } else {
                toggleStatus = false;
            }
        });

        $(document).on('click', 'i', function (e) {

            function dateSeqValidation(indexOfCurrentSelection) {
                var indicesOfAllSelections = _.filter(
                    _.map(monthlyWorkStatus, function (num, index) {
                        if (num != 0)
                            return index;
                        else return 0;
                    }),
                    function (num) {
                        return num > 0;
                    });

                if (indicesOfAllSelections.length > 0) {
                    if (Math.abs(indicesOfAllSelections[0] - indexOfCurrentSelection) > 1 &&
                        Math.abs(indicesOfAllSelections[indicesOfAllSelections.length - 1] - indexOfCurrentSelection) > 1) {
                        return false;
                    } else return true;
                } else return true;
            }

            function illegalSelectionValidation(indexOfCurrentSelection, intendedWorkStatus) {
                var prev = indexOfCurrentSelection - 1;
                var next = indexOfCurrentSelection + 1;

                switch (intendedWorkStatus) {
                    case WORK_STATUS.FIRST_HALF_WFH:
                        if ((prev >= 0 &&
                                monthlyWorkStatus[prev] == WORK_STATUS.FIRST_HALF_WFH) ||
                            (next < monthlyWorkStatus.length &&
                                (monthlyWorkStatus[next] == WORK_STATUS.FIRST_HALF_WFH ||
                                    monthlyWorkStatus[next] == WORK_STATUS.SECOND_HALF_WFH ||
                                    monthlyWorkStatus[next] == WORK_STATUS.FULL_DAY_WFH))) {
                            return false;
                        } else return true;
                    case WORK_STATUS.SECOND_HALF_WFH:
                        if ((prev >= 0 &&
                                (monthlyWorkStatus[prev] == WORK_STATUS.FIRST_HALF_WFH ||
                                    monthlyWorkStatus[prev] == WORK_STATUS.FULL_DAY_WFH ||
                                    monthlyWorkStatus[prev] == WORK_STATUS.SECOND_HALF_WFH)) ||
                            (next < monthlyWorkStatus.length &&
                                monthlyWorkStatus[next] == WORK_STATUS.SECOND_HALF_WFH)) {
                            return false;
                        } else return true;
                    case WORK_STATUS.FULL_DAY_WFH:
                        if ((prev >= 0 &&
                                monthlyWorkStatus[prev] == WORK_STATUS.FIRST_HALF_WFH) ||
                            (next < monthlyWorkStatus.length &&
                                monthlyWorkStatus[next] == WORK_STATUS.SECOND_HALF_WFH)) {
                            return false;
                        } else return true;
                    default:
                        return true;
                }
            }

            function isSelectionValid(selection, intendedWorkStatus) {
                var indexOfCurrentSelection = parseInt($(selection).attr('id').substring(1)) - 1;

                var f = dateSeqValidation(indexOfCurrentSelection) && illegalSelectionValidation(indexOfCurrentSelection, intendedWorkStatus);
                if (f) {
                    monthlyWorkStatus[indexOfCurrentSelection] = intendedWorkStatus;
                } else {
                    $(".alert").toggleClass('fade show');
                    window.setTimeout(function () {
                        $(".alert").toggleClass('show fade');
                    }, 3000);
                }

                return f;
            }


            var re = new RegExp(/x\d+/);

            if (re.test($(this).attr('id'))) {
                if (toggleStatus) {
                    if ($(this).hasClass('fa-star')) {
                        if (isSelectionValid(this, WORK_STATUS.NOT_WFH)) {
                            $(this).toggleClass('fa-star fa-star-o');
                        }
                    } else {
                        if (isSelectionValid(this, WORK_STATUS.FULL_DAY_WFH)) {
                            $(this).removeClass('fa-star-o fa-star-half-o fa-flip-horizontal').addClass('fa-star');
                        }
                    }
                } else {
                    var iWidth = $(this).outerWidth();
                    var iOffset = $(this).offset();

                    var x = e.pageX - iOffset.left;
                    if (iWidth / 2 > x) {
                        if ($(this).hasClass('fa-star-o')) {
                            if (isSelectionValid(this, WORK_STATUS.FIRST_HALF_WFH)) {
                                $(this).toggleClass('fa-star-o fa-star-half-o');
                            }
                        } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                            if (isSelectionValid(this, WORK_STATUS.FULL_DAY_WFH)) {
                                $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star');
                            }
                        } else if ($(this).hasClass('fa-star-half-o')) {
                            if (isSelectionValid(this, WORK_STATUS.NOT_WFH)) {
                                $(this).toggleClass('fa-star-half-o fa-star-o');
                            }
                        } else if ($(this).hasClass('fa-star')) {
                            if (isSelectionValid(this, WORK_STATUS.SECOND_HALF_WFH)) {
                                $(this).toggleClass('fa-star fa-star-half-o fa-flip-horizontal');
                            }
                        }
                    } else {
                        if ($(this).hasClass('fa-star-o')) {
                            if (isSelectionValid(this, WORK_STATUS.SECOND_HALF_WFH)) {
                                $(this).toggleClass('fa-star-o fa-star-half-o fa-flip-horizontal');
                            }
                        } else if ($(this).hasClass('fa-star-half-o fa-flip-horizontal')) {
                            if (isSelectionValid(this, WORK_STATUS.NOT_WFH)) {
                                $(this).toggleClass('fa-star-half-o fa-flip-horizontal fa-star-o');
                            }
                        } else if ($(this).hasClass('fa-star-half-o')) {
                            if (isSelectionValid(this, WORK_STATUS.FULL_DAY_WFH)) {
                                $(this).toggleClass('fa-star-half-o fa-star');
                            }
                        } else if ($(this).hasClass('fa-star')) {
                            if (isSelectionValid(this, WORK_STATUS.FIRST_HALF_WFH)) {
                                $(this).toggleClass('fa-star fa-star-half-o');
                            }
                        }
                    }
                }
            }

        });

        $(document).on('click', '#prev', function (e) {
            init();
        });

        $(document).on('click', '#next', function (e) {
            init();
        });
    });
});
