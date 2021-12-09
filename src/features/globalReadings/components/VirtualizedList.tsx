import { Grid } from "@mui/material";
import React from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
  ListRowRenderer,
} from "react-virtualized";
import ListItem from "./ListItem";

type VirtualizedListProps = {
  readings: any;
  list: any;
  outdated: any;
};

const VirtualizedList: React.FunctionComponent<VirtualizedListProps> = ({
  readings,
  list,
  outdated,
}) => {
  // NEED TO DECOUPLE FROM STATE SHAPE - removing this from virtualized list, remember to fix rowrenderer
  let r: { [k: string]: any } = {};
  if (readings && readings.length > 0) r = readings;

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 225,
    defaultHeight: 225,
  });

  const renderRow: ListRowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer
        rowIndex={index}
        columnIndex={0}
        key={key}
        cache={cache}
        parent={parent}
        enableMargins
      >
        {({ measure }) => (
          <ListItem
            key={key}
            id={r[index].id}
            list={list}
            outdated={outdated}
            style={style}
            measure={measure}
          />
        )}
      </CellMeasurer>
    );
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} sx={{ order: { lg: 2, md: 3 } }}>
      {readings && readings.length > 0 && (
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  width={width}
                  height={height}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowRenderer={renderRow}
                  rowCount={Object.keys(r).length}
                  autoHeight
                  scrollTop={scrollTop}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  style={{ outline: "none" }}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )}
    </Grid>
  );
};

export default VirtualizedList;
