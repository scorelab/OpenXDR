package com.scorelab.openads.compute;

import com.scorelab.openads.utility.Constants;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Created by root on 2/4/16.
 */
public class Filter {
    List<Pattern> patternList;

    public Filter(){
        patternList=new ArrayList<Pattern>();

        patternList.add(Pattern.compile(Constants.SPACE_FIELD_SEPARATOR, Pattern.LITERAL));

    }
}
