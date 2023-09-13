interface Props {
  title: string;
  badge: string;
  icon: string;
}

const BasicCard = ({
  badge,
  icon,
  title,

}: Props) => {
  return (
    <>
        <div style={{maxHeight:500, height:'100%'}} className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="card-info">
                <div className="d-flex align-items-end mb-2">
                  <h4 className="card-title mb-0 me-2">{title}</h4>
                </div>
              </div>
              <div className="card-icon">
                <span className={"badge " + badge}>
                  <i className={"bx " + icon}></i>
                </span>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default BasicCard;
